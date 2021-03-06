import React, { Component } from "react";
import PostView from "../../component/molecule/PostView/PostView";
import { PostDto } from "../../services/model/post.dto";
import BasePage from "../BasePage/BasePage";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { selectCommunity } from "../../store/CommunityStore";
import { PostService } from "../../services/api/services/post.service";

interface Params {
    id: string;
}

interface StoreProps {
    communityId: string;
}

type Props = RouteComponentProps<Params> & StoreProps;

interface State {
    post: PostDto | undefined;
    lastRefresh: Date;
    reload: boolean;
}

class PostPage extends Component<Props, State> {
    postPoller: NodeJS.Timeout;

    state: State = {
        post: undefined,
        lastRefresh: new Date(),
        reload: false,
    };

    async componentDidMount(): Promise<void> {
        await this.loadPost();
        this.postPoller = setInterval(() => this.loadPost(), 2000);
    }

    async componentDidUpdate(prevProps: Readonly<Props>): Promise<void> {
        const newId = this.props.match.params.id;
        const oldId = prevProps.match.params.id;
        if (newId !== oldId) {
            this.setState({ reload: true });
            await this.loadPost();
            this.setState({ reload: false });
        }
    }

    componentWillUnmount() {
        clearInterval(this.postPoller);
    }

    async loadPost(): Promise<void> {
        //Fetch post and comments and set page state with them
        const { id } = this.props.match.params;
        const { communityId } = this.props;
        const post = await PostService.getPost(communityId, id);
        if (post) this.setState({ post, lastRefresh: new Date() });
    }

    render(): JSX.Element {
        const { post, lastRefresh, reload } = this.state;

        return (
            <BasePage footer={false}>
                {post && !reload && (
                    <PostView
                        post={post}
                        onVote={(val) => this.setState({ post: val })}
                        onUpdate={() => this.loadPost()}
                        lastRefresh={lastRefresh}
                    />
                )}
            </BasePage>
        );
    }
}

export default connect((state: RootState) => ({
    communityId: selectCommunity(state.community).community.id,
}))(withRouter(PostPage));
