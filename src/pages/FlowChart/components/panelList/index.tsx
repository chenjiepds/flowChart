import { Item, ItemPanel } from 'gg-editor';
import styles from './index.less';

function ItemList() {
  return (
    <ItemPanel className={styles.itemPanel}>
      <Item
        className={styles.item}
        model={{
          // type: 'bizNode',
          type: 'circle',
          size: 50,
          label: 'circle',
          linkPoints: {
            top: true,
            right: true,
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          icon: {
            // show: true,
          },
        }}
      >
        <img
          src="https://gw.alicdn.com/tfs/TB1IRuSnRr0gK0jSZFnXXbRRXXa-110-112.png"
          width="55"
          height="56"
          draggable={false}
        />
      </Item>
      <Item
        className={styles.item}
        model={{
          type: 'rect',
          size: [80, 24],
          label: 'rect',
          anchorPoints: [[0, 0]],
        }}
      >
        <img
          src="https://gw.alicdn.com/tfs/TB1reKOnUT1gK0jSZFrXXcNCXXa-178-76.png"
          width="89"
          height="38"
          draggable={false}
        />
      </Item>
      <Item
        className={styles.item}
        model={{
          type: 'ellipse',
          size: [100, 50],
          label: 'ellipse',
        }}
      >
        <img
          src="https://gw.alicdn.com/tfs/TB1AvmVnUH1gK0jSZSyXXXtlpXa-216-126.png"
          width="108"
          height="63"
          draggable={false}
        />
      </Item>
      <Item
        className={styles.item}
        model={{
          type: 'diamond',
          size: [80, 80],
          label: 'diamond',
        }}
      >
        <img
          src="https://gw.alicdn.com/tfs/TB1EB9VnNz1gK0jSZSgXXavwpXa-178-184.png"
          width="89"
          height="92"
          draggable={false}
        />
      </Item>
      <Item
        className={styles.item}
        model={{
          type: 'triangle',
          size: [30, 30],
          label: 'triangle',
        }}
      >
        <img
          src="https://gw.alicdn.com/tfs/TB12sC2nKH2gK0jSZJnXXaT1FXa-126-156.png"
          width="63"
          height="78"
          draggable={false}
        />
      </Item>
    </ItemPanel>
  );
}

export default ItemList;
