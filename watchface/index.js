WatchFace({
    initView() {
        function assetArray(pattern, len=10) {
            const out = [];
            for(let i = 0; i < len; i++) {
                out.push(pattern.replace("{}", i));
            }
            return out;
        }

        const TIME = hmSensor.createSensor(hmSensor.id.TIME)

        const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        const dayPlans = [
            "1) Лит-ра\n2) Физ-ра\n3) История\n4) Алгебра\n5) Алгебра\n6) Кл. час",
            "1) ОБЖ\n2) Англ. яз.\n3) География\n4) Геометрия\n5) Биология\n6) История",
            "1) Рус. яз.\n2) Алгебра\n3) Алгебра\n4) Лит-ра\n5) Лит-ра\n6) Физика",
            "1) История\n2) Обществ.\n3) Геометрия\n4) Геометрия\n5) Биология\n6) Химия\n7) Информ.",
            "1) Физика\n2) Физика\n3) Комб.\n4) География\n5) Рус. яз.\n6) Рус. яз.",
            "1) Физ-ра\n2) Химия\n3) Информ.\n4) Информ.\n5) Англ. яз.\n6) Англ. яз.",
            "\n  Ты же ещё\nдержишься?"
        ]

        function changeDPVis() {
            clickCountDP+=1
            if (clickCountDP>2) {
                isDPVis=!isDPVis
                dayName.setProperty(hmUI.prop.TEXT, days[TIME.week-1])
                dayPlan.setProperty(hmUI.prop.TEXT, dayPlans[TIME.week-1])
                DPGroup.setProperty(hmUI.prop.VISIBLE, isDPVis)
                clickCountDP = 0
            }
        }

        function changeCtrlVis() {
            clickCount+=1
            if (clickCount>2) {
                isCtrlVis=!isCtrlVis
                back.setProperty(hmUI.prop.VISIBLE, isCtrlVis)
                next.setProperty(hmUI.prop.VISIBLE, isCtrlVis)
                clickCount=0
            }
        }

        function changeBG(c) {
            bgImgIndex+=c
            if (bgImgIndex==bgArray.length) {bgImgIndex=0}
            else if (bgImgIndex==-1) {bgImgIndex=bgArray.length-1}
            bg.setProperty(hmUI.prop.SRC, bgArray[bgImgIndex])

            if (whiteBg.includes(bgImgIndex)) {
                time.setProperty(hmUI.prop.VISIBLE, false)
                date.setProperty(hmUI.prop.VISIBLE, false)
                wtime.setProperty(hmUI.prop.VISIBLE, true)
                wdate.setProperty(hmUI.prop.VISIBLE, true)
            } else {
                time.setProperty(hmUI.prop.VISIBLE, true)
                date.setProperty(hmUI.prop.VISIBLE, true)
                wtime.setProperty(hmUI.prop.VISIBLE, false)
                wdate.setProperty(hmUI.prop.VISIBLE, false)
            }
        }

        const bgArray = assetArray("bg/{}.png", 23)
        const whiteBg = [0, 1, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23]
        const f = assetArray("numbers/{}.png")
        const lf = assetArray("little_numbers/{}.png")
        const wf = assetArray("numbersW/{}.png")
        const wlf = assetArray("little_numbersW/{}.png")
        isCtrlVis = true
        isDPVis = false
        clickCount = 0
        clickCountDP = 0
        bgImgIndex = 0

        const bg = hmUI.createWidget(hmUI.widget.IMG, {
            x:0, y:0, w:192, h:490,
            src: bgArray[0]
        })

        // DND
        hmUI.createWidget(hmUI.widget.IMG_STATUS, {
            x: 98, y: 5, src: "moon.png",
            type: hmUI.system_status.DISTURB
        })

        // Connection
        hmUI.createWidget(hmUI.widget.IMG_STATUS, {
            x: 78, y: 5, src: "disconnect.png",
            type: hmUI.system_status.DISCONNECT
        })

        const time = hmUI.createWidget(hmUI.widget.IMG_TIME, {
            w: 50,
            h: 50,
            hour_zero: 1,
            minute_zero: 1,
            hour_startX: 90,
            hour_startY: 60,
            minute_startX: 90,
            minute_startY: 105,
            hour_space: -5,
            minute_space: -5,
            minute_array: f,
            hour_array: f
        })
        
        const date = hmUI.createWidget(hmUI.widget.IMG_DATE, {
            day_startX: 85,
            day_startY: 160,
            month_space: -3,
            month_zero: 1,
            month_startX: 145,
            month_startY: 160,
            day_zero: 1,
            day_en_array: lf,
            day_sc_array: lf,
            day_tc_array: lf,
            month_en_array: lf,
            month_sc_array: lf,
            month_tc_array: lf,
            month_is_character: false
        })

        const wtime = hmUI.createWidget(hmUI.widget.IMG_TIME, {
            w: 50,
            h: 50,
            hour_zero: 1,
            minute_zero: 1,
            hour_startX: 90,
            hour_startY: 60,
            minute_startX: 90,
            minute_startY: 105,
            hour_space: -5,
            minute_space: -5,
            minute_array: wf,
            hour_array: wf
        })
        
        const wdate = hmUI.createWidget(hmUI.widget.IMG_DATE, {
            day_startX: 85,
            day_startY: 160,
            month_space: -3,
            month_zero: 1,
            month_startX: 145,
            month_startY: 160,
            day_zero: 1,
            day_en_array: wlf,
            day_sc_array: wlf,
            day_tc_array: wlf,
            month_en_array: wlf,
            month_sc_array: wlf,
            month_tc_array: wlf,
            month_is_character: false
        })

        const back = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y: 340,
            w: 96,
            h: 90,
            text_size: 40,
            normal_color: 0x696969,
            text: '<',
            click_func: () => { changeBG(-1) }
        })
        const next = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 96,
            y: 340,
            w: 96,
            h: 90,
            text_size: 40,
            normal_color: 0x696969,
            text: '>',
            click_func: () => { changeBG(1) }
        })

        // Show change BG buttons
        hmUI.createWidget(hmUI.widget.IMG, { 
            x:0, y:430, w:192, h:60
        }).addEventListener(hmUI.event.CLICK_UP, () => { changeCtrlVis() })

        const DPGroup = hmUI.createWidget(hmUI.widget.GROUP, {
            x:0, y:0, w:192, h:490
        })

        DPGroup.createWidget(hmUI.widget.IMG, {
            x:0, y:0, w:192, h:490,
            src: "blbg.png"
        })

        // Name of day
        const dayName = DPGroup.createWidget(hmUI.widget.TEXT, {
            color: 0xffffff,
            x: 80,
            y: 50,
            text_size: 25,
            text: ''
        })

        // Text of day plan
        const dayPlan = DPGroup.createWidget(hmUI.widget.TEXT, {
            color: 0xffffff,
            x: 15,
            y: 130,
            w: 192,
            text_size: 25,
            text: ''
        })

        // Show DP button
        hmUI.createWidget(hmUI.widget.IMG, {
            x:0, y:0, w:192, h:60
        }).addEventListener(hmUI.event.CLICK_UP, () => { changeDPVis() })

        time.setProperty(hmUI.prop.VISIBLE, false)
        date.setProperty(hmUI.prop.VISIBLE, false)
        DPGroup.setProperty(hmUI.prop.VISIBLE, false)
        timer.createTimer(0, 2000, () => {clickCount=0; clickCountDP=0})
    },

    onInit() { },

    build() {
        this.initView()
    }, 

    onDestroy() { },
})