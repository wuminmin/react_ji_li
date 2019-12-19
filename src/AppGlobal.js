class AppGlobal {
    // url = {
    //     javaurl_login: 'http://114.116.152.155:8080/role/login',
    //     django:'https://wx.wuminmin.top/jilizhushou',
    //     index:'http://weapp.wuminmin.top',
    //     login:'http://weapp.wuminmin.top/login',
    //     wenzhang:'http://weapp.wuminmin.top/wenzhang',
    //     duixian: 'http://weapp.wuminmin.top/duixian',
    //     queren:'http://weapp.wuminmin.top/queren',
    //     upload:'https://wx.wuminmin.top/jilizhushou/upload',
    //     myurl2:'http://weapp.wuminmin.top?usertoken=123456',
    //     get_tittle_list:'https://wx.wuminmin.top/jilizhushou/get_tittle_list',
    //     getUserInfo:'https://wx.wuminmin.top/jilizhushou/get_user_info',
    //     rd_xia_zai_by_lan_mu:'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_by_lan_mu',
    //     rd_xia_zai_by_tittle:'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_by_tittle',
    //     que_ren_by_sellid:'https://wx.wuminmin.top/jilizhushou/que_ren_by_sellid',
    // };

    url = {
        django:'https://wx.wuminmin.top/jilizhushou',
        upload:'https://wx.wuminmin.top/jilizhushou/upload',
        get_tittle_list:'https://wx.wuminmin.top/jilizhushou/get_tittle_list',
        rd_xia_zai_by_tittle:'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_by_tittle',
        que_ren_by_sellid:'https://wx.wuminmin.top/jilizhushou/que_ren_by_sellid',

        index:'/ji_li_zhu_shou/#/',
        login:'/sso/index.html?res=test',
        wenzhang:'/ji_li_zhu_shou/#/wenzhang',
        duixian: '/ji_li_zhu_shou/#/duixian',
        queren:'/ji_li_zhu_shou/#/queren',
        mynews:'/ji_li_zhu_shou/#/mynews/',

        首页:'/ji_li_zhu_shou/#/',

        已发布:'/ji_li_zhu_shou/#/mynews?ban_kuai=营销活动&lan_mu=已发布&tittle=默认',
        兑现中:'/ji_li_zhu_shou/#/mynews?ban_kuai=营销活动&lan_mu=兑现中&tittle=默认',
        已归档:'/ji_li_zhu_shou/#/mynews?ban_kuai=营销活动&lan_mu=已归档&tittle=默认',

        发布激励:'/ji_li_zhu_shou/#/wenzhang?ban_kuai=活动管理&lan_mu=发布激励&tittle=默认',
        兑现激励:'/ji_li_zhu_shou/#/duixian?ban_kuai=活动管理&lan_mu=兑现激励&tittle=默认',
        活动归档:'/ji_li_zhu_shou/#/duixian?ban_kuai=活动管理&lan_mu=活动归档&tittle=默认',

        确认激励:'/ji_li_zhu_shou/#/queren?ban_kuai=我的激励&lan_mu=确认激励&tittle=默认',
        历史激励:'/ji_li_zhu_shou/#/mynews?ban_kuai=我的激励&lan_mu=历史激励&tittle=默认',
        汇总统计:'/ji_li_zhu_shou/#/mynews?ban_kuai=我的激励&lan_mu=汇总统计&tittle=默认',

        公司领导:'/ji_li_zhu_shou/#/mynews?ban_kuai=我的激励&lan_mu=公司领导&tittle=默认',
        县区主任:'/ji_li_zhu_shou/#/mynews?ban_kuai=我的激励&lan_mu=县区主任&tittle=默认',
        营业部主任:'/ji_li_zhu_shou/#/mynews?ban_kuai=我的激励&lan_mu=营业部主任&tittle=默认',

        java_get_data:'/ji_li_zhu_shou/get.data',
       
    };
    
}
export default (new AppGlobal());
