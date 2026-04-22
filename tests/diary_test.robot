*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot

*** Variables ***
${DATE}        22.04.2026
${MOOD}        4
${WEIGHT}      72
${SLEEP}       7
${NOTE}        Automaatio testimerkintä päiväkirjaan.

*** Test Cases ***
Nav Login Works
    New Browser    chromium    headless=No
    New Page       http://localhost:5174/index.html

    # Odota että nav-login-form luodaan JS:llä
    Wait For Elements State    id=nav-login-form    visible    timeout=5s

    # Syötä käyttäjätunnus ja salasana
    Type Text      id=nav-username    ${Username}
    Type Secret    id=nav-password    $Password

    # Lähetä lomake
    Click          xpath=//form[@id='nav-login-form']//button[@type='submit']

    # Odota että JS vaihtaa navin tervetulotekstiin
    Wait For Elements State    xpath=//span[contains(.,'Tervetuloa')]    visible    timeout=5s

    # Varmista että nimi näkyy navissa
    ${text}=    Get Text    xpath=//span[contains(.,'Tervetuloa')]
    Should Contain    ${text}    ${Username}

    # valitsee päiväkirja sivun
    Wait For Elements State   id=diary-link   visible   timeout=3s
    CLick   id=diary-link

     # Odottaa että painike tulee näkyviin
    Wait For Elements State    text=Lisää uusi merkintä    visible    timeout=5s

    # Siirtyy lomakkeeseen
    Click    text=Lisää uusi merkintä

    # Odototaa että lomake latautuu
    Wait For Elements State    text=Päivämäärä    visible    timeout=5s

    # Täytetään kentätä
    Fill Text    input[name="entry-date"]        2026-04-22
    Fill Text    input[name="entry-mood"]        ${MOOD}
    Fill Text    input[name="entry-weight"]         ${WEIGHT}
    Fill Text    input[name="entry-sleep"]            ${SLEEP}
    Fill Text    textarea[name="entry-notes"]  ${NOTE}

    # Tallennetaan
    Click    text=Tallenna
