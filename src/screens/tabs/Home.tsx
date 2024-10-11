import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {useAppDispatch} from '../../hooks';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {theme, reviews} from '../../constants';
import {setScreen} from '../../store/slices/tabSlice';
import BottomTabBar from '../../navigation/BottomTabBar';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProductsData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const recommended = productsData?.filter((e) => e.rating?.rate >= 4) ?? [];

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const updateCurrentSlideIndex = (e: any): void => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / theme.sizes.width);
    setCurrentSlideIndex(currentIndex);
  };

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        basket={true}
        user={true}
        userImage={true}
        userName={true}
      />
    );
  };

  const renderCarousel = () => {
    return (
      <FlatList
        data={productsData.slice(0, 5)} // Showing the first 5 items as carousel
        onMomentumScrollEnd={(e) => updateCurrentSlideIndex(e)}
        renderItem={({item}) => (
          <components.Image
            source={{uri: item.image}}
            style={{width: theme.sizes.width, height: 250, aspectRatio: 1.5}}
          />
        )}
        pagingEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        alwaysBounceHorizontal={false}
      />
    );
  };

  const renderCategories = () => {
    return (
      <View style={{marginBottom: 30}}>
        <components.BlockHeading
          title='We offer'
          onPress={() => {
            dispatch(setScreen('Menu'));
          }}
          containerStyle={{marginHorizontal: 20, marginBottom: 14}}
        />
        <FlatList
          data={productsData}
          horizontal={true}
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
          decelerationRate={0}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menulist', {
                  category: item.category,
                });
              }}
            >
              <components.ImageBackground
                source={{uri: item.image}}
                style={{
                  width: 90,
                  height: 90,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  marginRight: 10,
                  justifyContent: 'flex-end',
                }}
                resizeMode='cover'
                imageStyle={{borderRadius: 10}}
              >
                <Text
                  style={{
                    ...theme.fonts.DMSans_400Regular,
                    fontSize: 10,
                    color: theme.colors.mainColor,
                  }}
                >
                  {item.category}
                </Text>
              </components.ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderRecommended = () => {
    const slice = recommended?.slice(0, 12);

    if (recommended.length > 0) {
      return (
        <View style={{marginBottom: 30}}>
          <components.BlockHeading
            title='Recommended for you'
            containerStyle={{marginHorizontal: 20, marginBottom: 14}}
          />
          <FlatList
            data={slice}
            horizontal={true}
            contentContainerStyle={{paddingLeft: 20}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled={true}
            snapToInterval={theme.sizes.width - responsiveWidth(44.2)}
            decelerationRate={0}
            renderItem={({item, index}) => {
              const lastItem = index === slice.length - 1;
              return (
                <components.RecommendedItem item={item} lastItem={lastItem} />
              );
            }}
          />
        </View>
      );
    }

    return null;
  };

  const renderReviews = () => {
    const slice = reviews?.slice(0, 12);

    return (
      <View style={{marginBottom: 20}}>
        <components.BlockHeading
          title='Our Happy clients say'
          onPress={() => {
            navigation.navigate('Reviews');
          }}
          containerStyle={{marginHorizontal: 20, marginBottom: 14}}
        />
        <FlatList
          data={slice}
          horizontal={true}
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
          snapToInterval={theme.sizes.width - 54}
          decelerationRate={0}
          renderItem={({item, index}) => {
            const last = index === reviews.length - 1;
            return <components.ReviewItem item={item} last={last} />;
          }}
        />
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <components.Loader />;
    }
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 6}}
        showsVerticalScrollIndicator={false}
      >
        {renderCarousel()}
        {renderCategories()}
        {renderRecommended()}
        {renderReviews()}
      </ScrollView>
    );
  };

  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default Home;
