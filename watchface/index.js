import { createWidget, widget } from "@zos/ui"

function fontArray(pattern, amount=10) {
    const res = []
    for (i=0; i<amount; i++) {
        res.push(pattern.replace("{}", i))
    }
    return res
}

function createTime(font) {
    return createWidget(widget.IMG_TIME, {
        hour_zero: 1,
        hour_startX: 100,
        hour_startY: 70,
        hour_array: font,
        hour_space: 5,
        hour_unit_en: font[10],
        hour_unit_tc: font[10],
        hour_unit_sc: font[10],
        minute_follow: 1,
        minute_zero: 1,
        minute_array: font,
        minute_space: 8,
    })
}

function createDate(font) {
    return createWidget(widget.IMG_DATE, {
        year_startX: 110,
        year_startY: 80,
        year_space: 1, // Spacing of text.
        year_zero: 1, // Whether to make up zeroes.
        year_follow: 1, // Whether to follow.
        year_en_array: font,
        year_sc_array: font,
        year_tc_array: font,
        year_is_character: true
    })
}

WatchFace({
    initView() {
        const timeArray = fontArray("timeFont/{}.png")
        timeArray.push("timeFont/10.png")
        const dateArray = fontArray("dateFont/{}.png")

        const bg = createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: "bg/0.png"
        })

        const time = createTime(timeArray)
        const date = createDate(dateArray)

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
