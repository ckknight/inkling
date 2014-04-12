Feature: Success Screen
In order confirm event creation
As a drunk concert goer
I want view, share, or add another event
 
Scenario: View, Share, Add new event
Given User has swiped left from event preview screen
And the calendar event has been created
When the event creation has completed
Then the success screen is shown
And it has a "view" button
And it has a "share" button
And it has a "new" button