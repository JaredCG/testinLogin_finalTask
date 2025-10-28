Feature: SauceDemo Login

  Scenario: UC-1 Login with empty credentials
    Given I open the SauceDemo login page
    When I click the Login button
    Then I should see the error message "Username is required"

  Scenario: UC-2 Login with missing password
    Given I open the SauceDemo login page
    When I enter "standard_user" in the Username field
    And I click the Login button
    Then I should see the error message "Password is required"

  Scenario: UC-3 Login with valid credentials
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the Login button
    Then I should see the dashboard with title "Swag Labs"
