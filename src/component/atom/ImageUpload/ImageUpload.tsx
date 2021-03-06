import { classNames } from "@agustinmj/class-names";
import React, { Component, CSSProperties, ReactElement } from "react";
import Icon from "../Icon/Icon";
import { Upload } from "../Upload/Upload";
import "./ImageUpload.scss";

interface Props {
    children: ReactElement;
    onNewImageSelected: (img: File) => void;
    className?: string;
    style?: CSSProperties;
    uploadPositon?: "center" | "top-right";
    readonly?: boolean;
    showUploadIcon?: boolean;
}

export default class ImageUpload extends Component<Props> {
    render(): JSX.Element {
        const { onNewImageSelected, className, style, children, uploadPositon, readonly, showUploadIcon = true } = this.props;

        return (
            <Upload
                fileTypes="image"
                onChange={(value?: File | FileList) => onNewImageSelected(value as File)}
                className={classNames("image-upload", className)}
                style={style}
                readonly={readonly}
            >
                {children}
                {showUploadIcon && (
                    <Icon
                        icon="trayArrowUp"
                        className={classNames("upload-icon", uploadPositon)}
                        size={uploadPositon !== "top-right" ? "xl" : "lg"}
                    />
                )}
            </Upload>
        );
    }
}
