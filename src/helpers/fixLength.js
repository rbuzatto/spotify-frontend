export default (str, len = 50) => str.length > len ? str.slice(0,len) + ' ...' : str