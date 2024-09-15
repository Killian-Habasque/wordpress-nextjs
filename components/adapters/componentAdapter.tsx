import SectionImageText from "../blocks/sectionImageText";
import RelationLists from "../blocks/relationLists";
import FeaturesLists from "../blocks/featuresLists";

export default function ComponentAdapter(props) {
    const { data, typename } = props

    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (<SectionImageText text={data.text} image={data.image} direction={data.direction} />)
        case 'BlocksContentRelationListsLayout':
            return (<RelationLists text={data.text} postypes={data.postType.nodes} />)
        case 'BlocksContentFeaturesListsLayout':
            return (<FeaturesLists text={data.text} listImage={data.listImage} listText={data.listText}/>)
    }
}