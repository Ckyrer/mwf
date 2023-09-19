import { createWidget, widget, prop, event } from "@zos/ui"
import { Time } from '@zos/sensor'

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

const wbg = [1]
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const dayPlans = [
    "1", "2", "3", "4", "5", "6", "7"
]


WatchFace({
    initView() {
        const timeArray = fontArray("timeFont/{}.png", 11)
        const dateArray = fontArray("dateFont/{}.png")

        const timeArrayW = fontArray("timeFontW/{}.png", 11)
        const dateArrayW = fontArray("dateFontW/{}.png")

        const TIME = new Time()

        const bgArray = fontArray("bg/{}.png", 2)
        bgIndex = 0

        const bg = createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: bgArray[bgIndex]
        })

        function changeBg(c) {
            bgIndex+=c
            if (bgIndex>=bgArray.length) {bgIndex=0}
            else if (bgIndex<0) {bgIndex=bgArray.length-1}
            bg.setProperty(prop.MORE, {src: bgArray[bgIndex]})
            const isW = wbg.includes(bgIndex)
            TDGroup.setProperty(prop.VISIBLE, !isW)
            TDGroupW.setProperty(prop.VISIBLE, isW)
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
            x:0, y:250, w:50, h:100, text: "<",
            text_size: 40,
            radius: 20,
            click_func: () => { changeBg(-1) }
        })
        const next = createWidget(widget.BUTTON, {
            x:340, y:250, w:50, h:100, text: ">",
            text_size: 40,
            radius: 20,
            click_func: () => { changeBg(1) }
        })

        showContolsCount = 0
        createWidget(widget.IMG, {
            x:0, y:350, w:390, h:100
        }).addEventListener(event.CLICK_UP, () => {
            if (showContolsCount==0) {
                setTimeout(() => {
                    showContolsCount=0
                }, 600)
            }
            showContolsCount+=1
            if (showContolsCount>2) {
                isControlsVis = !isControlsVis
                back.setProperty(prop.VISIBLE, isControlsVis)
                next.setProperty(prop.VISIBLE, isControlsVis)
                showContolsCount=0
            }
        })

        isDPVis = false
        const DPGroup = createWidget(widget.GROUP, {})
        DPGroup.createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: "blbg.png"
        })

        const dPDay = DPGroup.createWidget(widget.TEXT, {
            x:170, y:30, color: 0xFFFFFF, text_size: 45,
            text: ""
        })

        const dPPlan = DPGroup.createWidget(widget.TEXT, {
            x:50, y:120, color: 0xFFFFFF, text_size: 30,
            text: ""
        })
        
        DPGroup.setProperty(prop.VISIBLE, false)

        showDPCount = 0
        createWidget(widget.IMG, {
            x:0, y:0, w:390, h:100
        }).addEventListener(event.CLICK_UP, () => {
            if (showDPCount==0) {
                setTimeout(() => {
                    showDPCount=0
                }, 600)
            }
            showDPCount+=1
            if (showDPCount>2) {
                console.log("wdad")
                isDPVis = !isDPVis
                DPGroup.setProperty(prop.VISIBLE, isDPVis)
                dPDay.setProperty(prop.MORE, {text: weekDays[TIME.getDay()-1]})
                dPPlan.setProperty(prop.MORE, {text: dayPlans[TIME.getDay()-1]})
                showDPCount=0
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
