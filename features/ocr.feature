Feature: Image processing screen
	In order to initiate OCR capture of event data
	As a drunk concert goer
	I want to distract user while OCR process runs
 
Scenario: Display Image processing screen
	Given I have taken a picture of the poster
	And the scanning image progress bar has been presented
	When the progress bar is completed
	Then the event preview screen is displayed