Feature: SauceDemo Login Functionality
  As a user of SauceDemo
  I want to test the login functionality
  So that I can ensure proper validation and access control

  Background:
    Given I open the SauceDemo login page

  @UC-1 @regression
  Scenario: UC-1 Test Login form with empty credentials
    When I enter "standard_user" in the Username field
    And I enter "secret_sauce" in the Password field
    And I clear the Username field
    And I clear the Password field
    And I click the Login button
    Then I should see the error message "Username is required"

    #When I click the Login button without entering credentials
    #Then I should see the error message "Username is required"

  @UC-2 @regression
  Scenario: UC-2 Test Login form with credentials by passing Username
    When I enter "standard_user" in the Username field
    And I enter "secret_sauce" in the Password field
    And I clear the Password field
    And I click the Login button
    Then I should see the error message "Password is required"

  @UC-3 @smoke @regression
  Scenario: UC-3 Simple login test
    When I enter "standard_user" in the Username field
    And I enter "secret_sauce" in the Password field
    And I click the Login button
    Then I should see the dashboard with title "Swag Labs"
    And the page URL should contain "inventory.html"

  #@UC-3-alternative @regression
  #Scenario Outline: UC-3 Login with various valid credentials
  #  When I enter "<username>" in the Username field
  #  And I enter "<password>" in the Password field
  #  And I click the Login button
  #  Then I should see the dashboard with title "Swag Labs"

  #  Examples:
  #    | username                | password     |
  #    | standard_user           | secret_sauce |
  #    | problem_user            | secret_sauce |
  #    | performance_glitch_user | secret_sauce |