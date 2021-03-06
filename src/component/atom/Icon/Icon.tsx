import React, { Component } from "react";
import { Svg } from "../Svg/Svg";
import { icons } from "../../../assets/icons";
import { classNames } from "@agustinmj/class-names";
import "./Icon.scss";

export type IconSize = "mini" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface Props {
    icon: any;
    size?: IconSize;
    color?: string;
    className?: string;
    style?: any;
    onClick?: (e?: MouseEvent) => void;
}

export default class Icon extends Component<Props> {
    iconsMap = new Map(Object.entries(icons));

    render(): JSX.Element {
        const { icon, size, color, className, style, onClick } = this.props;

        return (
            <div style={{ display: "contents" }} onClick={(e) => onClick?.(e as any)}>
                <Svg
                    src={this.iconsMap.get(icon) as string}
                    color={color}
                    className={classNames(size || "sm", onClick && "clickable-icon", className, "fade-in")}
                    style={style || {}}
                />
            </div>
        );
    }
}
