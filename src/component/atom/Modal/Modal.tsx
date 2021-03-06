import { classNames } from "@agustinmj/class-names";
import { nextTick } from "process";
import React, { Component, CSSProperties, ReactNode } from "react";
import "./Modal.css";
import { hideModal } from "./modal-store";

export interface ModalProps {
    name?: string;
    className?: string;
    style?: CSSProperties;
    closable?: boolean;
    wrapperClassName?: string;
    wrapperStyle?: any;
    closeElement?: JSX.Element;
    header?: JSX.Element;
    footer?: JSX.Element;
    overlay?: boolean;
    transition?: "fade" | "from-bottom";
}

interface ModalState {
    closing: boolean;
}

export class Modal extends Component<ModalProps, ModalState> {
    ref: React.RefObject<HTMLDivElement> = React.createRef();

    state: ModalState = {
        closing: false,
    };

    async onClose(): Promise<void> {
        if (this.props.closable !== false && !this.state.closing) {
            const modal = this.ref?.current;
            if (modal) {
                modal.style.opacity = "0";
                await Promise.all(modal.getAnimations().map((animation) => animation.finished));
                this.setState({ closing: true });
                hideModal({ modalName: this.props.name });
            }
        }
    }

    render(): JSX.Element {
        const { className, style, wrapperClassName, wrapperStyle, children, overlay, transition = "fade", ...rest } = this.props;

        nextTick(() => {
            if (this.ref && this.ref.current) {
                this.ref.current.style.opacity = "1";
            }
        });

        return (
            <div
                className={classNames("my-modal-wrapper", transition === "fade" ? "modal-fade" : "modal-from-bottom", wrapperClassName)}
                style={wrapperStyle || {}}
                onMouseDown={() => this.onClose()}
                ref={this.ref}
            >
                {children &&
                    (overlay ? (
                        <>{children}</>
                    ) : (
                        <InnerModal className={classNames(className)} style={style || {}} {...rest} onClose={() => this.onClose()}>
                            {children}
                        </InnerModal>
                    ))}
            </div>
        );
    }
}

interface InnerProps {
    className?: string;
    style?: CSSProperties;
    closable?: boolean;
    onClose?: () => void;
    closeElement?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

class InnerModal extends Component<InnerProps> {
    render(): JSX.Element {
        const { className, style, children, header, footer, closeElement, onClose, closable } = this.props;

        return (
            <div className={classNames("my-modal", className)} style={style || {}} onMouseDown={(e) => e.stopPropagation()}>
                {(closable === undefined || closable) && closeElement && (
                    <div className="my-modal-close" onClick={() => onClose?.()}>
                        {closeElement}
                    </div>
                )}
                {header}
                {children}
                {header && <div className="my-modal-footer">{footer}</div>}
            </div>
        );
    }
}
