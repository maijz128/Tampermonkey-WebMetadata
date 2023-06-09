import CivitAI from './civitai';
import Mjztool from "./mjztool";


const SCRIPT_NAME = '网页元数据';
var lp = window.location.pathname;
var currentHandler = null;

const app = () => {
  let rid = new URLSearchParams(window.location.search).get('rid');

  registerMenuCommand();

  if (Mjztool.matchURL('civitai.com')) {
    currentHandler = new CivitAI();
  }

  if (currentHandler) currentHandler.start();
};

// 注册脚本菜单
function registerMenuCommand() {
  var menuAll = [
    ['menu_disable', '✅ 已启用 (点击对当前网站禁用)', '❌ 已禁用 (点击对当前网站启用)', []],
    // ['menu_thread', '帖子内自动翻页 (社区类网站)', '帖子内自动翻页 (社区类网站)', true],
    // ['menu_page_number', '显示当前页码及点击暂停翻页', '显示当前页码及点击暂停翻页', true],
    // ['menu_pause_page', '左键双击网页空白处暂停翻页', '左键双击网页空白处暂停翻页', false],
    // ['menu_history', '添加历史记录+修改地址/标题', '添加历史记录+修改地址/标题', true],
    // ['menu_rules', '更新外置翻页规则 (每天自动)', '更新外置翻页规则 (每天自动)', {}],
    ['menu_customRules', '自定义翻页规则', '自定义翻页规则', {}]
  ], menuId = [], webType = 0;

  menuId[menuId.length] = GM_registerMenuCommand('💾 下载元数据', function () {
    console.info(SCRIPT_NAME + ' - 💾 下载元数据 [ ' + location.href + ' ]');
    DownloadMetadata();
  });

  menuId[menuId.length] = GM_registerMenuCommand('💾 下载所有元数据', function () {
    console.info(SCRIPT_NAME + ' - 💾 下载元数据 [ ' + location.href + ' ]');
    DownloadMetadata(true);
  });

  menuId[menuId.length] = GM_registerMenuCommand('💬 反馈失效 / 申请支持', function () {
    window.GM_openInTab('https://github.com/maijz128/Tampermonkey-WebMetadata', { active: true, insert: true, setParent: true }); window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', { active: true, insert: true, setParent: true });
  });

}

// const DownloadMetadata = (rid: string, videoSub: Element) => {
const DownloadMetadata = (saveAll = false) => {
  if (currentHandler) {
    currentHandler.download(saveAll);
  }
};



export default app;
