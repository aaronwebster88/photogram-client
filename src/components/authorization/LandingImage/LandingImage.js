import React, { Component } from 'react';
import Image1 from '../../../assets/State-Fair-4.jpg';
import Image2 from '../../../assets/tetons_1.jpg';
import Image3 from '../../../assets/Thailand-TMAX-5.jpg';
import './LandingImage.css';
import '../Authorization.css';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

const items = [
    {
        src: Image1,
        altText: 'State Fair',
    },
    {
        src: Image2,
        altText: 'Grand Teton National Park',
    },
    {
        src: Image3,
        altText: 'Lake Michigan',
    }
]

export default class LandingImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if(this.animating) return;
        this.setState({ activeIndex: newIndex});
    }

    render() {
        const { activeIndex } = this.state;
        
        const slides = items.map((item) => {
            return(
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} >
                    <img src={item.src} alt={item.altText} />
                </CarouselItem>
            );
        });

        return(
            <div className="wrapperPhoto">
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
            
        );
    }
}