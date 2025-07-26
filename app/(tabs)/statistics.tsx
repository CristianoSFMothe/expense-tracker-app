import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { fetchWeeklyStats } from "@/services/transactionService";
import { scale, verticalScale } from "@/utils/styling";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const Statistics = () => {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chatLoading, setChartLoading] = useState(false);

  useEffect(() => {
    if (activeIndex === 0) {
      getWeeklyStats();
    }

    if (activeIndex === 1) {
      getMonthlyStats();
    }

    if (activeIndex === 2) {
      getYearlyStats();
    }
  }, [activeIndex]);

  const getWeeklyStats = async () => {
    setChartLoading(true);

    let response = await fetchWeeklyStats(user?.uid as string);

    setChartLoading(false);

    if (response.success) {
      setChartData(response?.data?.stats);
    } else {
      Alert.alert("Estadísticas", response.msg);
    }
  };

  const getMonthlyStats = async () => {};

  const getYearlyStats = async () => {};

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title="Estadísticas" />
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: spacingY._20,
            paddingTop: spacingY._5,
            paddingBottom: verticalScale(100),
          }}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            values={["Semanal", "Mensual", "Anual"]}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setActiveIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral800}
            appearance="dark"
            activeFontStyle={styles.segmentoFontStyle}
            style={styles.segmentStyle}
            fontStyle={{ ...styles.segmentoFontStyle, color: colors.white }}
          />

          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                barWidth={scale(12)}
                spacing={[1, 2].includes(activeIndex) ? scale(25) : scale(16)}
                roundedTop
                roundedBottom
                hideRules
                yAxisLabelPrefix="R$"
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelWidth={
                  [1, 2].includes(activeIndex) ? scale(38) : scale(35)
                }
                yAxisTextStyle={{ color: colors.neutral350 }}
                xAxisLabelTextStyle={{
                  color: colors.neutral350,
                  fontSize: verticalScale(12),
                }}
                noOfSections={3}
                minHeight={5}
                isAnimated={true}
                animationDuration={1000}
              />
            ) : (
              <View style={styles.noChar} />
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  chartLoadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius._12,
    backgroundColor: "rgba(0,0,0 0.6)",
  },
  header: {},
  noChar: {
    backgroundColor: "rgba(0,0,0 0.6)",
    height: verticalScale(100),
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: verticalScale(50),
    width: verticalScale(50),
    borderCurve: "continuous",
  },
  segmentStyle: {
    height: scale(37),
  },
  segmentoFontStyle: {
    fontSize: verticalScale(13),
    fontWeight: "bold",
    color: colors.black,
  },
  container: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._5,
    gap: spacingY._10,
  },
});
