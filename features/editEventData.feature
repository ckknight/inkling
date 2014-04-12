Feature: Edit Event Data
	In order to alter or add to captured event data
	As a drunk concert goer
	I want to edit contents of event preview screen

Scenario: User changes event preview data
	Given I select "event info" field
	And the system keyboard is presented to user
	When the user finishes text entry
	Then the keyboard is hidden and "event preview" screen is shown