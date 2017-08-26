import { h, Component } from "preact";
import styled, { css } from 'emotion/react'
import theme from '../../helpers/theme';

import {readableBytes} from '../../helpers/utils';

const UL = styled('ul')`
  list-style: none;
  width: 100%;
  padding: 0px;
  margin: 0;
  li {
    height: 40px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    color: #FFF;
    font-size: 13px;
    &.subheader: {background: rgba(44, 44, 71, 0.3);}
    span {
      display: inline-block;
      width: 20%;
      text-align: center;
    }
    .name {
      width: 40%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      text-align: left;
    }
  }
`;

const header = css`
  background: rgb(69, 66, 112);
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
`;

const Brief = styled('div')`
width: 100%;
background: #000;
padding: 12px 15px 8px 15px;
background: rgba(69, 66, 112, 0.9);
div {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 1;
  color: #FFF;
  height: 20px;
  width: 100%;
  display: flex;
  span:last-child {
    flex: none;
    margin-left: auto;
  }
}
`

class AssetsList extends Component {
  overLimitCount = (assets) => {
    return assets.reduce((c, asset) => {
      if(asset.isOverSizeLimit) {
        return ++c;
      }
    }, 0)
  }
  render({assets, assetsSize}){
    return (
      <div>
        <Brief>
          <div>
            <span>total assets: </span>
            <span>{`${assets.length}`}</span>
          </div>
          <div>
            <span>Total Size:</span>
            <span>{readableBytes(assetsSize)}</span>
          </div>
          <div>
            <span>Over size limit:</span>
            <span>{this.overLimitCount(assets)}</span>
          </div>
        </Brief>
        <UL>
          <li className={header}>
            <div className='name'>Name</div>
            <span>Size</span>
            <span>Chunks</span>
            <span></span>
          </li>
          {
            assets.map(
              asset => 
              <li>
                <div className='name'>{asset.name}</div>
                <span>{readableBytes(asset.size)}</span>
                <span>{asset.chunks[0]}</span>
              </li>
            )
          }
        </UL>
      </div>
    )
  }
}

export default AssetsList;
