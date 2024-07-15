export default {
    base_url: '192.168.1.5:5000',
    user_id: -1,
    login: false,
    global_suffix: '.html',
    //图片尺寸限制4MB，头像自动处理为1/16 *size，用户背景图自动处理为1/4 *size
    global_pic_size_limit: 4,
    circle_current_like_list: [],
    menuList: [{}],
    menuName: [],
    imgPre: 'http://e.gschaos.club/',
    // imgPre: 'http://192.168.1.5/img/',
    user: {
        id: 1,
        name: "",
        avatar: "",
        title: "",
    },
}

export function baseUrl() {
    return this.$baseUrl;
}

export function getObjectClass(type) {
    let classObject = {}
    if (type === 1) {
        if (window.screen.width <= 768) {
            classObject = {
                _10_size_800: true
            }
        } else if (window.screen.width <= 1920) {
            classObject = {
                _10_size_1920: true
            }
        } else if (window.screen.width <= 2160) {
            classObject = {
                _10_size_2160: true
            }
        } else {
            classObject = {
                _10_size_3840: true
            }
        }
    } else if (type === 2) {
        if (window.screen.width <= 768) {
            classObject = {
                _14_size_800: true
            }
        } else if (window.screen.width <= 1920) {
            classObject = {
                _14_size_1920: true
            }
        } else if (window.screen.width <= 2160) {
            classObject = {
                _14_size_2160: true
            }
        } else {
            classObject = {
                _14_size_3840: true
            }
        }

    } else if (type === 3) {
        if (window.screen.width <= 768) {
            classObject = {
                _20_size_800: true
            }
        } else if (window.screen.width <= 1920) {
            classObject = {
                _20_size_1920: true
            }
        } else if (window.screen.width <= 2160) {
            classObject = {
                _20_size_2160: true
            }
        } else {
            classObject = {
                _20_size_3840: true
            }
        }
    }
    return classObject;

}
