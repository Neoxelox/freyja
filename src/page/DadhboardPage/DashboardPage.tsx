import React, { Component } from "react";
import Post from "../../component/atom/Post/Post";
import BasePage from "../BasePage/BasePage";
import FloatingButton from "../../component/atom/FloatingButton/FloatingButton";
import { PostDto } from "../../services/model/post.dto";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface Props {
    posts: PostDto[];
    loading: boolean;
}

class DashboardPage extends Component<Props> {
    render(): JSX.Element {
        const { posts } = this.props;

        return (
            <BasePage>
                {posts.map((post) => (
                    <Post {...post} />
                ))}
                <FloatingButton />
            </BasePage>
        );
    }
}

export default connect((state: RootState) => ({
    posts: state.post.posts,
    loading: state.post.loading,
}))(DashboardPage);
