/**
 * importing modules.
 */
const exec = require('child_process').exec

const config = require('./config.json')

let allowedIpList = []
let staticIpList = []
let dynamicIpList = []

/**
 * function to execute command.
 * param: cmd (string)
 */
let executeCommand = (singleObject) => {
  return new Promise((resolve, reject) => {
    exec(singleObject.command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error occurred while executing command`)
        console.log(error)
        reject({ error: true, data: null })
      } else if (stderr) {
        console.log(`command executed with error`)
        console.log(stderr)
        reject({ error: true, data: stderr })
      } else {
        resolve(stdout)
      } // end else.
    })
  })
} // end of the executeCommand function.

/**
 * promise function to generate static ip list.
 */
let generateStaticIpList = () => {
  return new Promise((resolve, reject) => {
    // traversing.
    config.staticIpsWhitelist.forEach((singleObject) => {
      staticIpList.concat(singleObject.ips)
    })

    resolve()
  })
} // end of the generateStaticIpList function.

/**
 * promise function generate dynamic ip list.
 */
let generateDynamicIpList = () => {
  return new Promise((resolve, reject) => {
    // traversing and fetching ips.
    let outPromise = config.dynamicIpsLink.map(executeCommand)

    Promise.all(outPromise)
      .then((result) => {
        // console.log(result)

        // result will be the array string elements.
        // this will contain ips of the sources.

        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
} // end of the generateDynamicIpList function.

/**
 * function to set allowed ip list.
 * params:
 */
let setAllowedIpList = () => {
  // making promise call.
  generateStaticIpList()
    .then(generateDynamicIpList)
    .then((result) => {
      allowedIpList.concat(staticIpList, dynamicIpList)

      resolve()
    })
    .catch((error) => {
      console.log(`-- error while checking isCrawler --`)
      console.log(error)
      reject({ error: true, data: 'error while checking isCrawler' })
    })
} // end of the setAllowedIpList function.

/**
 * function to check is ipAddress is in allowedIpList.
 * params: ipAddress.
 */
let ifExistInAllowedIpList = (ipAddress) => {
  let index = allowedIpList.indexOf(ipAddress)

  if (index === -1) {
    return false
  } else {
    return true
  }
} // end of the ifExistInAllowedIpList function.

/**
 * function to check given ip is crawler or not.
 * return true if crawler, spider, bot.
 * params: ipAddress
 */
let isCrawler = (ipAddress) => {
  
} // end of the isCrawler function.

/**
 * exporting function.
 */
module.exports = {
  isCrawler
}
