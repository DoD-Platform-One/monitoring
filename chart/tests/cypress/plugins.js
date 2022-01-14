// This is required in order to write to stdout within a cypress test via:
//  cy.task(log, 'console message')
// The messages are then visible in the pipeline CI when it dumps the cypress test's pod logs.
// It's especially helpful if the screenshots/videos of the test can't be retrieved.
module.exports = (on, config) => {
    on('task', {
      log(message) {
        console.log(message)
        return null
      },
    })
  }