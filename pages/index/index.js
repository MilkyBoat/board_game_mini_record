//index.js
const app = getApp()

Page({
  data: {
    select: false,

    gameNames: ['斗牛', '二十一点'],
    nameIndex: 0,

    gameMems: ['个人记分', '3','4','5','6','7','8','9','10'],
    memIndex: 1,

    gameMul: 1
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
  bindMulInput: function (e) {
    this.setData({
      gameMul: e.detail.value
    })
  },
  startGame: function () {
    var nameInd = this.data.nameIndex
    var mem = this.data.gameMems[this.data.memIndex]
    if (this.data.memIndex == 0) {  // 个人模式
      mem = 1;
    }
    var mul = this.data.gameMul
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
