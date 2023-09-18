import { createWidget, widget, prop, event } from "@zos/ui"

function fontArray(pattern, amount=10) {
    const res = []
    for (i=0; i<amount; i++) {
        res.push(pattern.replace("{}", i))
    }
    return res
}

function createTime(font) {
    return {
        hour_zero: 1,
        hour_startX: 170,
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
    }
}

function createDate(font) {
    return {
        month_startX: 325,
        month_startY: 165,
        month_zero: 1,
        month_en_array: font,
        month_sc_array: font,
        month_tc_array: font,

        day_startX: 265,
        day_startY: 165,
        day_zero: 1,
        day_en_array: font,
        day_sc_array: font,
        day_tc_array: font,
    }
}


const wbg = []

WatchFace({
    initView() {
        const timeArray = fontArray("timeFont/{}.png")
        timeArray.push("timeFont/10.png")
        const dateArray = fontArray("dateFont/{}.png")

        const timeArrayW = fontArray("timeFontW/{}.png")
        timeArray.push("timeFontW/10.png")
        const dateArrayW = fontArray("dateFontW/{}.png")

        const bgArray = fontArray("bg/{}.png", 2)
        bgIndex = 0

        const bg = createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: bgArray[1]
        })

        function changeBg(c) {
            bgIndex+=c
            if (bgIndex>=bgArray.length) {bgIndex=0}
            else if (bgIndex<0) {bgIndex=bgArray.length-1}
            bg.setProperty(prop.MORE, {src: bgArray[bgIndex]})
        }

        const TDGroup = createWidget(widget.GROUP, {})
        TDGroup.createWidget(widget.IMG_TIME, createTime(timeArray))
        TDGroup.createWidget(widget.IMG_DATE, createDate(dateArray))

        const TDGroupW = createWidget(widget.GROUP, {})
        TDGroupW.createWidget(widget.IMG_TIME, createTime(timeArrayW))
        TDGroupW.createWidget(widget.IMG_DATE, createDate(dateArrayW))
        TDGroupW.setProperty(prop.VISIBLE, false)

        isControlsVis = true;
        const back = createWidget(widget.BUTTON, {
            x:0, y:250, w:195, h:100, text: "<",
            click_func: () => { changeBg(-1) }
        })
        const next = createWidget(widget.BUTTON, {
            x:195, y:250, w:195, h:100, text: ">",
            click_func: () => { changeBg(1) }
        })

        showContolsCount = 0
        createWidget(widget.IMG, {
            x:0, y:350, w:390, h:100
        }).addEventListener(event.CLICK_UP, () => {
            showContolsCount+=1
            if (showContolsCount>2) {
                isControlsVis = !isControlsVis
                back.setProperty(prop.VISIBLE, isControlsVis)
                next.setProperty(prop.VISIBLE, isControlsVis)
                showContolsCount=0
            }
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
