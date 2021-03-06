import React, { Component } from "react";
import { connect } from "react-redux";
import { PostDto } from "../../../../services/model/post.dto";
import { RootState } from "../../../../store";
import { selectCommunity } from "../../../../store/CommunityStore";
import { PostService } from "../../../../services/api/services/post.service";
import { PostHistoryDto } from "../../../../services/model/post-history.dto";
import History from "../../../atom/History/History";

interface Props {
    post: PostDto;
    communityId: string;
    lastRefresh: Date;
}

interface State {
    history: PostHistoryDto[];
}

class PostComments extends Component<Props> {
    state: State = {
        history: [],
    };

    async componentDidMount(): Promise<void> {
        await this.loadHistory();
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        const { lastRefresh } = this.props;
        const shouldUpdate = prevProps.lastRefresh < lastRefresh;
        if (shouldUpdate) this.loadHistory();
    }

    async loadHistory(): Promise<void> {
        const { communityId, post } = this.props;
        const history = await PostService.getHistory(communityId, post.id);
        if (history) this.setState({ history });
    }

    render(): JSX.Element {
        const { history } = this.state;
        const { lastRefresh, post } = this.props;

        return <>{lastRefresh && history.map((h: PostDto, i: number) => <History key={i.toString()} history={h} post={post} />)}</>;
    }
}

export default connect((state: RootState) => ({
    communityId: selectCommunity(state.community)?.community?.id,
}))(PostComments);
