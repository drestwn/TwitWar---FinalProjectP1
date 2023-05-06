function published (input) {
    const h = input.getHours()
    const m = input.getMinutes()
    const d = new Date()
    const hNow = d.getHours()
    const mNow = d.getMinutes()
    
    const hEgo = hNow - h
    if (hEgo) {
      return hEgo + " hours ago"
    }
    
    const mEgo = mNow - m
    if (mEgo) {
      return mEgo + " minutes ago"
    }
  
  }
  
  module.exports = published;