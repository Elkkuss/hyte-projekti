*** Settings ***
Library    Browser
Resource   keywords.robot

*** Test Cases ***
Complete Selenium Web Form Demo
    # Avaa selain ja sivu
    New Browser    chromium    headless=No
    New Page    https://www.selenium.dev/selenium/web/web-form.html

    # Tekstikenttä
    Type Text    [name="my-text"]    ${username}    delay=0.1 s

    # Password-kenttä
    Type Secret    [name="my-password"]    $password    delay=0.1 s

    # Textarea
    Type Text    [name="my-textarea"]    ${message}     delay=0.1 s

    # Dropdown (select)
    Wait For Elements State     [name="my-select"]  visible
    Select Options By    [name="my-select"]    value    2

    # Datalist (autocomplete)
    Type Text   [name="my-datalist"]  San Francisco   delay=0.2 s

    # Checkbox
    Click   [name="my-check-1"]

    # Radio button
    Click    id=my-radio

    # Date input
    Fill Text    id=my-date    2024-12-24

    # File upload
    Set Input Files    id=my-file    ${CURDIR}/testfile.txt

    # Submit-nappi
    Click    css=button

    # Varmista että tulossivu latautui
    Wait For Elements State    css=h1    visible
    ${header}=    Get Text    css=h1
    Log    Tulossivun otsikko: ${header}
