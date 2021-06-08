import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import * as timeago from 'timeago.js';

import './NewsBanner.css'

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

const NewsBanner = (props) => {

    const news = props.news

    return <div style={{ width: 'inherit', height: 'inherit' }}>
        <BannerAnim type="across" autoPlay>
            {news.map(newItem => (
                <Element key={newItem.url}
                    prefixCls="banner-user-elem"
                >

                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: `url(${newItem.image || "https://i.stack.imgur.com/y9DpT.jpg"})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <a href={newItem.url}>
                        <QueueAnim name="QueueAnim" style={{ padding: '20px', color: 'white' }}>
                            <p key="p">{newItem.from} - {timeago.format(newItem.date)}</p>
                            <h1 key="h1">{newItem.title}</h1>
                            <div key="div" style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }} >
                                {newItem.chips}
                            </div>
                        </QueueAnim>
                    </a>
                </Element>
            ))}
        </BannerAnim>
    </div>
}

export default NewsBanner