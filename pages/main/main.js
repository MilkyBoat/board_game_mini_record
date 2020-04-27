// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score_value: [[1, -1, 2, -2, 3, -3, 5, -5, 10, -10]],
    scoreType: 0,
    bankerId: 0,
    gameMem :3,
    gameMul :1,
    pre: {'pid':-1, 's_r':0, 's_t':0},
    score: [
      {
        "pid": 0,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 1,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 2,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 3,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 4,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 5,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 6,
        "s_round": 0,
        "s_total": 0
      },
      {
        "pid": 7,
        "s_round": 0,
        "s_total": 0
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ scoreType: options.gameName })
    this.setData({ gameMem: options.gameMem })
    this.setData({ gameMul: options.gameMul })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户选择得分处理函数--监听用户选择数值事件
   */
  bindScoreChange: function (e) {

    // 庄家的得分由其它玩家计算得到，不可以单独设置
    if(e.target.id == this.data.bankerId)
      return;

    // 备份前一次的用户轮次得分与总分
    var ppid = 'pre.pid';
    var psr = 'pre.s_r';
    var pst = 'pre.s_t';
    this.setData({
      [ppid]: e.target.id,
      [psr]: this.data.score[e.target.id].s_round,
      [pst]: this.data.score[e.target.id].s_total
    })

    // 修改当前玩家数据
    var tar_round = "score[" + e.target.id + "].s_round";
    var tar_total = "score[" + e.target.id + "].s_total";
    var tar_r_value = this.data.score_value[this.data.scoreType][e.detail.value] * this.data.gameMul;
    var tar_t_value = this.data.score[e.target.id].s_total + tar_r_value;
    this.setData({
      [tar_round]: tar_r_value,
      [tar_total]: tar_t_value
    })

    // 庄家数据联动
    tar_round = "score[" + this.data.bankerId + "].s_round";
    tar_total = "score[" + this.data.bankerId + "].s_total";
    tar_t_value = this.data.score[this.data.bankerId].s_total - tar_r_value;
    this.setData({
      [tar_round]: '-',
      [tar_total]: tar_t_value
    })
  },

  /**
   * 撤销处理函数--监听用户点击撤销按钮事件
   */
  bindRev: function (e) {
    // 没有保存的数据时直接返回
    if (this.data.pre.pid < 0)
      return;

    // 撤销最近一次庄家数据
    tar_round = "score[" + this.data.bankerId + "].s_round";
    tar_total = "score[" + this.data.bankerId + "].s_total";
    var tar_t_value = this.data.score[this.data.bankerId].s_total + this.data.score[this.data.pre.pid].s_round;
    this.setData({
      [tar_round]: '-',
      [tar_total]: tar_t_value
    })

    // 撤销最近一次玩家数据
    var tar_round = "score[" + this.data.pre.pid + "].s_round";
    var tar_total = "score[" + this.data.pre.pid + "].s_total";
    this.setData({
      [tar_round]: this.data.pre.s_r,
      [tar_total]: this.data.pre.s_t
    })

    // 清除备份数据
    var ppid = 'pre.pid';
    var psr = 'pre.s_r';
    var pst = 'pre.s_t';
    this.setData({
      [ppid]: -1,
      [psr]: 0,
      [pst]: 0
    })
  },

  /**
   * 开始下一轮处理函数--监听用户点击下一轮按钮事件
   */
  bindNext: function (e) {
    var self = this
    wx.showModal({
      title: '开始下一轮',
      content: '所有数据将清空',
      success(res) {
        if (res.confirm) {
          self.clearData();
        }
      }
    });
  },

  /**
   * 切换庄家函数--监听用户点击“庄”按钮事件
   */
  bindSwitchBanker(e) {
    // 没有切换庄家时不做回应
    if(e.target.id==this.data.bankerId)
      return;

    // 切换庄家，清空数据
    var self = this
    wx.showModal({
      title: '切换庄家',
      content: '所有数据将清空，请确认已完成结算',
      success(res) {
        if (res.confirm) {
          self.clearData();
          // 设置新的庄家id
          self.setData({ bankerId: e.target.id })
        }
      }
    });
  },

  /**
   * 清空数据函数
   */
  clearData: function () {
    var ppid = 'pre.pid';
    var psr = 'pre.s_r';
    var pst = 'pre.s_t';
    this.setData({
      [ppid]: -1,
      [psr]: 0,
      [pst]: 0
    })
    for (var i = 0; i < this.data.gameMem; i++) {
      var tar_round = "score[" + i + "].s_round";
      var tar_total = "score[" + i + "].s_total";
      this.setData({
        [tar_round]: 0,
        [tar_total]: 0
      })
    }
  }
})