import {makeProject} from '@revideo/core';
import {Circle, Rect, Txt, makeScene2D} from '@revideo/2d';
import {all, chain, createRef, easeInOutCubic, waitFor} from '@revideo/core';

const scene = makeScene2D('scene', function* (view) {
  view.fill('#0f172a');

  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const card1 = createRef<Rect>();
  const card2 = createRef<Rect>();
  const card3 = createRef<Rect>();
  const label1 = createRef<Txt>();
  const label2 = createRef<Txt>();
  const label3 = createRef<Txt>();
  const dot = createRef<Circle>();

  view.add(
    <>
      <Txt
        ref={title}
        text={'PROJETOCRUD'}
        fontSize={140}
        fontWeight={800}
        fill={'#f8fafc'}
        y={-260}
        opacity={0}
        scale={0.7}
      />
      <Txt
        ref={subtitle}
        text={'React  +  Express  +  Postgres'}
        fontSize={48}
        fill={'#94a3b8'}
        y={-140}
        opacity={0}
      />
      <Rect
        ref={card1}
        width={420}
        height={260}
        radius={28}
        fill={'#1e293b'}
        stroke={'#38bdf8'}
        lineWidth={4}
        x={-540}
        y={200}
        opacity={0}
      />
      <Rect
        ref={card2}
        width={420}
        height={260}
        radius={28}
        fill={'#1e293b'}
        stroke={'#a78bfa'}
        lineWidth={4}
        x={0}
        y={200}
        opacity={0}
      />
      <Rect
        ref={card3}
        width={420}
        height={260}
        radius={28}
        fill={'#1e293b'}
        stroke={'#f472b6'}
        lineWidth={4}
        x={540}
        y={200}
        opacity={0}
      />
      <Txt ref={label1} text={'Frontend'} fontSize={42} fill={'#38bdf8'} x={-540} y={140} opacity={0} />
      <Txt ref={label2} text={'API'} fontSize={42} fill={'#a78bfa'} x={0} y={140} opacity={0} />
      <Txt ref={label3} text={'DB'} fontSize={42} fill={'#f472b6'} x={540} y={140} opacity={0} />
      <Circle
        ref={dot}
        size={32}
        fill={'#22c55e'}
        x={-540}
        y={140}
        opacity={0}
      />
    </>,
  );

  yield* chain(
    all(title().opacity(1, 0.8), title().scale(1, 0.8, easeInOutCubic)),
    subtitle().opacity(1, 0.6),
    waitFor(0.3),
    all(
      card1().opacity(1, 0.5),
      card1().y(140, 0.5, easeInOutCubic),
      label1().opacity(1, 0.5),
    ),
    all(
      card2().opacity(1, 0.5),
      card2().y(140, 0.5, easeInOutCubic),
      label2().opacity(1, 0.5),
    ),
    all(
      card3().opacity(1, 0.5),
      card3().y(140, 0.5, easeInOutCubic),
      label3().opacity(1, 0.5),
    ),
  );

  yield* dot().opacity(1, 0.3);
  yield* dot().x(0, 0.7, easeInOutCubic);
  yield* dot().x(540, 0.7, easeInOutCubic);
  yield* dot().x(-540, 0.9, easeInOutCubic);

  yield* waitFor(0.6);
});

export default makeProject({
  scenes: [scene],
  settings: {
    shared: {
      size: {x: 1280, y: 720},
    },
  },
});
