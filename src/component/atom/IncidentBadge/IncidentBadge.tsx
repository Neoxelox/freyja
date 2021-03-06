import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { PostDto } from "../../../services/model/post.dto";
import "./IncidentBadge.scss";

interface Props {
    state: PostDto["state"];
}

export default class IncidentBadge extends Component<Props> {
    getBadgeBgAndText(): { bg: string; text: string } {
        switch (this.props.state) {
            case "RESOLVED":
                return {
                    bg: "success",
                    text: "RESUELTA",
                };
            case "PENDING":
                return {
                    bg: "secondary",
                    text: "PENDIENTE DE APROBACIÓN",
                };
            case "ACCEPTED":
                return {
                    bg: "info",
                    text: "ACEPTADA",
                };
            case "REJECTED":
                return {
                    bg: "danger",
                    text: "RECHAZADA",
                };
            case "IN_PROGRESS":
            default:
                return {
                    bg: "warning",
                    text: "EN PROGRESO",
                };
        }
    }

    render(): JSX.Element {
        const { bg, text } = this.getBadgeBgAndText();

        return (
            <Badge bg={bg} className="incident-badge">
                {text}
            </Badge>
        );
    }
}
