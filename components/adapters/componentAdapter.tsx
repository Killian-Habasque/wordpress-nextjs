import SectionImageText from "../blocks/sectionImageText";
import RelationLists from "../blocks/relationLists";

export default function ComponentAdapter(props) {
    const { data, typename } = props

    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (<SectionImageText text={data.text} image={data.image} direction={data.direction} />)
        case 'BlocksContentRelationListsLayout':
            return (<RelationLists text={data.text} postypes={data.postType.nodes} />)
    }
}