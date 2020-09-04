import { TinderCard } from "@dooboo-ui/core";
import {
  TinderCardDirection,
  TinderCardRef,
} from "@dooboo-ui/core/lib/TinderCard";

export default function Page() {
  const tinderCard = useRef < TinderCardRef > null;

  return (
    <Container>
      <TinderCard
        testID="tinderCard"
        ref={tinderCard}
        onSwipeRight={handleUnlike}
        onSwipeLeft={handleLike}
        onCancel={handleCancel}
        data={data}
        renderCards={_renderCards}
        renderNoMoreCards={_renderNoMoreCards}
        containerStyle={{ width: 300, height: 500 }}
        shouldRotate
        swipeRightLabelElement={() => <LikeLabel>Like!</LikeLabel>}
        swipeLeftLabelElement={() => <UnlikeLabel>Unlike!</UnlikeLabel>}
        swipeLabelAlignStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ButtonWrapper
          style={{ backgroundColor: "#ff7676" }}
          onPress={() => {
            tinderCard.current.forceSwipe(TinderCardDirection.LEFT);
          }}
        >
          <StyledText style={{ fontSize: 15 }}>UNLIKE</StyledText>
        </ButtonWrapper>

        <ButtonWrapper
          onPress={() => {
            tinderCard.current.handleCancel();
          }}
        >
          <StyledText style={{ fontSize: 15 }}>UNDO</StyledText>
        </ButtonWrapper>

        <ButtonWrapper
          style={{ backgroundColor: "#44d1a6" }}
          onPress={() => {
            tinderCard.current.forceSwipe(TinderCardDirection.RIGHT);
          }}
        >
          <StyledText style={{ fontSize: 15 }}>LIKE</StyledText>
        </ButtonWrapper>
      </View>
    </Container>
  );
}
