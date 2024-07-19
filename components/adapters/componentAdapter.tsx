import SectionImageText from "../blocks/sectionImageText";

export default function ComponentAdapter(props) {
    const { data, typename } = props

    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (<SectionImageText text={data.text} image={data.image} direction={data.direction} />)
    }
}