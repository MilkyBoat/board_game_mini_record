//index.js
const app = getApp()

Page({
  data: {
    select: false,

    gameNames: ['斗牛'],
    nameIndex: 0,

    gameMems: ['3','4','5','6','7','8'],
    memIndex: 0,

    gameMul: ['0.1', '0.5', '1', '1.5', '2'],
    mulIndex: 2
  },

  onLoad: function (options) {

  }, 
  bindNameChange: function (e) {
    this.setData({
      nameIndex: e.detail.value
    })
  },
  bindMemChange: function(e) {
    this.setData({
      memIndex: e.detail.value
    })
  },
  bindMulChange: function (e) {
    this.setData({
      mulIndex: e.detail.value
    })
  },
  startGame: function () {
    var nameInd = this.data.nameIndex
    var mem = this.data.gameMems[this.data.memIndex]
    var mul = this.data.gameMul[this.data.mulIndex]
    wx.navigateTo({
      url: '../main/main?gameName=' + nameInd + '&gameMem=' + mem + '&gameMul=' + mul
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
