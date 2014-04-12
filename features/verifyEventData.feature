Feature: Verify Event Data
	In order to create calendar event
	As a drunk concert goer
	I want to confirm presented event data from event preview screen
 
Scenario: User confirms event data
	Given I approve of event data captured
	And I do not want to edit or add additional information
	When the user swipes screen to left
	Then App accepts form and creates system calendar event