import { createWidget, widget } from "@zos/ui"

function fontArray(pattern, amount=10) {
    const res = []
    for (i=0; i<amount; i++) {
        res.push(pattern.replace("{}", i))
    }
    return res
}

WatchFace({
    initView() {
        const timeArray = fontArray("timeFont/{}.png")

        const bg = createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: "bg/0.png"
        })

        const time = createWidget(widget.IMG_TIME, {
            hour_zero: 1, // Whether to make up zero.
            hour_startX: 205,
            hour_startY: 184,
            hour_array: timeArray,
            hour_space: 8, // The interval between each array.
            // Units
            hour_align: hmUI.align.LEFT,
            // minute second Replaces hour.
            minute_follow: 1, // Whether to follow.
            second_follow: 1, // Whether to follow.
            // omitted as above
            am_x: 200,
            am_x: 200, am_y: 100,
            am_sc_path: 'am.png',
            am_en_path: 'am_en.png'
            // pm as above. Prefix changed from am to pm.
        })

    },

    onInit() {
        console.log('index page.js on init invoke')
    },

    build() {
        this.initView()
    },

    onDestroy() {
        console.log('index page.js on destroy invoke')
    },
})
