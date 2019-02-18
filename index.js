/**
 * importing modules.
 */
const detector = require('./src/detector.js')

/**
 * function to check given ip is crawler or not.
 * return true if crawler, spider, bot.
 * params: ipAddress
 */
let isCrawler = (ipAddress) => {
  detector.setAllowedIpList()
    .then(() => {
      if (detector.ifExistInAllowedIpList(ipAddress) || detector.ifExistInDomainList(ipAddress)) {
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      console.log(`-- error while checking isCrawler --`)
      console.log(error)

      return false
    })
} // end of the isCrawler function.

/**
 * exporting function.
 */
module.exports = {
  isCrawler
}
