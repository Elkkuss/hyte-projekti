*** Settings ***
Library     Browser    auto_closing_level=KEEP

*** Variables ***
${URL}          http://localhost:5173/paivakirja.html
${USERNAME}     testiuser
${PASSWORD}     testisalis
${DATE}         2026-04-05
${MOOD}         Rauhallinen
${WEIGHT}       75.5
${SLEEP}        7
${NOTES}        Testimerkintä Robot Frameworkilla.

*** Test Cases ***
Add New Diary Entry
    New Browser    chromium    headless=No
    New Page       ${URL}

    # Varmista että sivu on auki
    Get Title      contains    Positioning Items

    Fill Text      id=nav-username     ${USERNAME}
    Fill Text      id=nav-password     ${PASSWORD}
    Evaluate    document.querySelector('#nav-login-form').requestSubmit()


  
    

    # 1. Avaa lomake
    Click          id=open-entry-form
    Wait For Elements State    id=entry-form-container    visible    timeout=3s

    # 2. Päivämäärä valitaan date-pickerille sopivalla tavalla
    Fill Text      id=entry-date      ${DATE}

    # 3. Täytä muut kentät
    Type Text      id=entry-mood      ${MOOD}
    Type Text      id=entry-weight    ${WEIGHT}
    Type Text      id=entry-sleep     ${SLEEP}
    Type Text      id=entry-notes     ${NOTES}

    # 4. Tallenna
    Click    css=.save-btn



    # 5. Varmista että lomake sulkeutui
    Wait For Elements State    id=entry-form-container    hidden    timeout=3s
