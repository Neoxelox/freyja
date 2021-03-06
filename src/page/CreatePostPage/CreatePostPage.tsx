import { Component } from "react";
import BasePage from "../BasePage/BasePage";
import CreatePostOrIssue from "../../component/molecule/CreatePostOrIssue/CreatePostOrIssue";

export default class DashboardPage extends Component {
    render(): JSX.Element {
        return (
            <BasePage footer={false}>
                <CreatePostOrIssue type="PUBLICATION" />
            </BasePage>
        );
    }
}
