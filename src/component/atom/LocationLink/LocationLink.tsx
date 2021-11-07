import React, { Component } from "react";
import { icons } from "../../../assets/icons";
import "./LocationLink.scss";
import { Link } from "react-router-dom";
import { classNames } from "@agustinmj/class-names";
import Icon from "../Icon/Icon";

interface Props {
    icon?: keyof typeof icons;
    selectedIcon?: keyof typeof icons;
    children: string;
    to: string;
    align?: "row" | "column";
}

export default class LocationLink extends Component<Props> {
    isActive(): boolean {
        const { to } = this.props;
        const location = window.location.toString();
        return location.includes(to + "/") || location.endsWith(to);
    }

    render(): JSX.Element {
        const { icon, children, to, selectedIcon, align } = this.props;

        return (
            <Link
                to={to}
                className={classNames(
                    "location-link",
                    window.location.toString().includes(to) && "location-link-active",
                    align === "row" && "location-link-row",
                )}
            >
                {icon && (this.isActive() && selectedIcon ? <Icon icon={selectedIcon} size="sm" /> : <Icon icon={icon} size="sm" />)}
                <h6>{children}</h6>
            </Link>
        );
    }
}
