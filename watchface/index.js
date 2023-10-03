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

const wbg = [3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const opbg = new Map()

opbg.set(4, [90, 70, 140, 165])
opbg.set(5, [190, 70, 285, 165])
opbg.set(6, [15, 70, 40, 165])
opbg.set(7, [90, 70, 140, 165])
opbg.set(9, [90, 70, 140, 165])
opbg.set(10, [90, 70, 140, 165])
opbg.set(11, [90, 70, 140, 165])
opbg.set(12, [90, 70, 140, 165])
opbg.set(14, [90, 70, 140, 165])

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const dayPlans = [
    "1) Лит-ра\n2) Физ-ра\n3) История\n4) Алгебра\n5) Алгебра\n6) Кл. час",
    "1) ОБЖ\n2) Англ. яз.\n3) География\n4) Геометрия\n5) Биология\n6) История",
    "1) Рус. яз.\n2) Алгебра\n3) Алгебра\n4) Лит-ра\n5) Лит-ра\n6) Физика",
    "1) История\n2) Обществ.\n3) Геометрия\n4) Геометрия\n5) Биология\n6) Химия\n7) Информ.",
    "1) Физика\n2) Физика\n3) Комб.\n4) География\n5) Рус. яз.\n6) Рус. яз.",
    "1) Физ-ра\n2) Химия\n3) Информ.\n4) Информ.\n5) Англ. яз.\n6) Англ. яз.",
    "\nНу наверно\nможно отдохнуть"
]


WatchFace({
    initView() {
        const timeArray = fontArray("timeFont/{}.png", 11)
        const dateArray = fontArray("dateFont/{}.png")

        const timeArrayW = fontArray("timeFontW/{}.png", 11)
        const dateArrayW = fontArray("dateFontW/{}.png")

        const TIME = new Time()

        const bgArray = fontArray("bg/{}.png", 16)
        bgIndex = 0

        const bg = createWidget(widget.IMG, {
            x:0, y:0, w:390, h:450,
            src: bgArray[bgIndex]
        })

        function setTimePos(widget, font, x, y) {
            const param = createTime(font)
            param.hour_startX = x
            param.hour_startY = y
            widget.setProperty(prop.MORE, param)
        }

        function setDatePos(widget, font, x, y) {
            const param = createDate(font)
            param.month_startX = x+60
            param.month_startY = y
            param.day_startX = x
            param.day_startY = y
            widget.setProperty(prop.MORE, param)
        }

        function changeBg(c) {
            bgIndex+=c
            if (bgIndex>=bgArray.length) {bgIndex=0}
            else if (bgIndex<0) {bgIndex=bgArray.length-1}
            bg.setProperty(prop.MORE, {src: bgArray[bgIndex]})
            const isW = wbg.includes(bgIndex)

            TDGroup.setProperty(prop.VISIBLE, !isW)
            TDGroupW.setProperty(prop.VISIBLE, isW)

            if (opbg.has(bgIndex)) {
                const pos = opbg.get(bgIndex)
                setTimePos(time, timeArray, pos[0], pos[1])
                setDatePos(date, dateArray, pos[2], pos[3])
                setTimePos(timew, timeArrayW, pos[0], pos[1])
                setDatePos(datew, dateArrayW, pos[2], pos[3])
            } else {
                setTimePos(time, timeArray, 170, 70)
                setDatePos(date, dateArray, 265, 165)
                setTimePos(timew, timeArrayW, 170, 70)
                setDatePos(datew, dateArrayW, 265, 165)
            }
        }

        const TDGroup = createWidget(widget.GROUP, {})
        const time = TDGroup.createWidget(widget.IMG_TIME, createTime(timeArray))
        const date = TDGroup.createWidget(widget.IMG_DATE, createDate(dateArray))

        const TDGroupW = createWidget(widget.GROUP, {})
        const timew = TDGroupW.createWidget(widget.IMG_TIME, createTime(timeArrayW))
        const datew = TDGroupW.createWidget(widget.IMG_DATE, createDate(dateArrayW))
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
            x:290, y:350, w:100, h:100
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
            x:50, y:120, w:300, color: 0xFFFFFF, text_size: 30,
            text: ""
        })
        
        DPGroup.setProperty(prop.VISIBLE, false)

        showDPCount = 0
        createWidget(widget.IMG, {
            x:290, y:0, w:100, h:100
        }).addEventListener(event.CLICK_UP, () => {
            if (showDPCount==0) {
                setTimeout(() => {
                    showDPCount=0
                }, 600)
            }
            showDPCount+=1
            if (showDPCount>2) {
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
