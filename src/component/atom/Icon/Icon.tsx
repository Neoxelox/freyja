import React, { Component } from "react";
import { Svg } from "../Svg/Svg";
import { icons } from "../../../assets/icons";
import { classNames } from "@agustinmj/class-names";
import "./Icon.scss";

interface Props {
    icon: any;
    size?: "mini" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    color?: string;
    className?: string;
    style?: any;
    onClick?: () => void;
}

export default class Icon extends Component<Props> {
    iconsMap = new Map(Object.entries(icons));

    render(): JSX.Element {
        const { icon, size, color, className, style, onClick } = this.props;

        return (
            <Svg
                src={this.iconsMap.get(icon) as string}
                color={color}
                className={classNames(size || "sm", onClick && "clickable-icon", className)}
                style={style || {}}
                onClick={() => onClick?.()}
            />
        );
    }
}
