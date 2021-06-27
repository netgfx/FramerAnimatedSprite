import * as React from "react"
import {
    Frame,
    addPropertyControls,
    ControlType,
    Color,
    Stack,
    useAnimation,
    useMotionValue,
    animate,
} from "framer"

// Learn more: https://framer.com/api

export function AnimatedSprite(props) {
    const {
        components,
        spriteFrameWidth,
        spriteFrameHeight,
        animationSpeed,
        spriteFrames,
        numberOfAnimations,
        currentAnimation,
        offsetX,
        offsetY,
    } = props
    const controls = useAnimation()
    const x = useMotionValue(props.spriteFrameWidth)
    const [value, setValue] = React.useState(props.spriteFrameWidth * -1)
    const [vertFrame, setVertFrame] = React.useState(
        props.currentAnimation * props.spriteFrameHeight * 0.5 * -1 + offsetY
    )
    const onTap = () => {
        const controls = animate(x, spriteFrameWidth * spriteFrames, {
            delay: 0,
            duration: props.animationSpeed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
            onComplete: (val) => {},
            onUpdate: (val) => {
                var finalVal = Math.abs(
                    props.spriteFrameWidth * Math.floor(val / spriteFrameWidth)
                )
                console.log(finalVal, val)
                setValue(finalVal * -1)
            },
        })
    }
    return (
        <Frame
            background="none"
            size="100%"
            onTap={onTap}
            style={{ overflow: "hidden" }}
        >
            {React.Children.map(props.components, (child, index) => {
                var component = {}

                if (index === 0) {
                    component = React.cloneElement(child, {
                        height: props.spriteFrameHeight,
                        //height: "100%",
                        key: index,
                        x: value,
                        y: 0,
                        style: {
                            left: props.spriteFrameWidth + "px",
                            position: "absolute",
                            top: vertFrame + "px",
                            height: props.spriteFrameHeight + "px",
                        },
                        //animation: controls,
                        componentType: props.componentType,

                        // Additional Props
                    })
                }
                return component
            })}
        </Frame>
    )
}

AnimatedSprite.defaultProps = {
    tint: "#09F",
}

addPropertyControls(AnimatedSprite, {
    components: {
        type: ControlType.Array,
        control: {
            type: ControlType.ComponentInstance,
            title: "Child Component",
        },
        maxCount: 1,
    },
    spriteFrameWidth: {
        title: "Sprite Frame width",
        type: ControlType.Number,
        defaultValue: 310,
    },
    spriteFrameHeight: {
        title: "Sprite Frame height",
        type: ControlType.Number,
        defaultValue: 380,
    },
    spriteFrames: {
        title: "Sprite Number of Frames",
        type: ControlType.Number,
        defaultValue: 4,
    },
    animationSpeed: {
        title: "Sprite Animation speed",
        type: ControlType.Number,
        defaultValue: 0.5,
    },
    numberOfAnimations: {
        title: "Sprite Animation number",
        type: ControlType.Number,
        defaultValue: 1,
    },
    currentAnimation: {
        title: "Sprite Current Animation",
        type: ControlType.Number,
        defaultValue: 0,
    },
    offsetX: {
        title: "OffsetX",
        type: ControlType.Number,
        defaultValue: 0,
    },
    offsetY: {
        title: "OffsetY",
        type: ControlType.Number,
        defaultValue: 0,
    },
})
