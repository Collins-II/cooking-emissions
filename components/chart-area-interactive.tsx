"use client"

import * as React from "react"
//import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
//import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  //CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
/*import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import axios from "axios";

export const description = "An interactive area chart showing live climate change effects"

/*interface ClimateData {
  date: string;
  temperatureAnomaly: number; // °C deviation from average
  co2Levels: number; // ppm
}

const chartConfig = {
  climate: {
    label: "Climate Metrics",
  },
  temperatureAnomaly: {
    label: "Temperature Anomaly",
    color: "var(--primary)",
  },
  co2Levels: {
    label: "CO2 Levels",
    color: "var(--secondary)",
  },
} satisfies ChartConfig*/

export function ChartAreaInteractive() {
  /*const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const [climateData, setClimateData] = React.useState<ClimateData[]>([])

const options = {
  method: 'GET',
  url: 'https://meteostat.p.rapidapi.com/stations/normals',
  params: {
    station: '10637',
    start: '1961',
    end: '1990'
  },
  headers: {
    'x-rapidapi-key': '406cfb7392mshd7ec84a66608362p1bc1c1jsnb5ce23005420',
    'x-rapidapi-host': 'meteostat.p.rapidapi.com'
  }
};



  // Fetch live climate data from API
  React.useEffect(() => {
  async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log("CLIMATE_DATA",response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();
    const fetchClimateData = async () => {
      try {
        const response = await fetch(`https://api.climatechange.org/data?range=${timeRange}`);

         // Replace with real API endpoint
        if (!response.ok) throw new Error("Failed to fetch climate data");
        const data = await response.json();
        // Assuming API returns array of { date, temperatureAnomaly, co2Levels }
        setClimateData(data);
      } catch (error) {
        console.error("Error fetching climate data:", error);
        // Fallback to placeholder data if API fails
        const placeholderData: ClimateData[] = [
          { date: "2025-07-10", temperatureAnomaly: 1.2, co2Levels: 420 },
          { date: "2025-07-11", temperatureAnomaly: 1.3, co2Levels: 421 },
          { date: "2025-07-12", temperatureAnomaly: 1.4, co2Levels: 422 },
          { date: "2025-07-13", temperatureAnomaly: 1.5, co2Levels: 423 },
          { date: "2025-07-14", temperatureAnomaly: 1.6, co2Levels: 424 },
          { date: "2025-07-15", temperatureAnomaly: 1.7, co2Levels: 425 },
          { date: "2025-07-16", temperatureAnomaly: 1.8, co2Levels: 426 },
        ];
        setClimateData(placeholderData);
      }
    };

    fetchClimateData();
    // Poll every 5 minutes for live updates
    const interval = setInterval(fetchClimateData, 300000);

    return () => clearInterval(interval);
  }, [timeRange]);

  /*const filteredData = climateData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-07-16"); // Today's date
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });*/

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Live Climate Change Effects</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
       {/* <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>*/}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <iframe src="https://cdn.climatechangetracker.org/embedding/yearly-total-human-induced-net-CO2-emissions" scrolling="no" frameBorder="0" className="w-full h-[400px] aspect-auto"></iframe>
       {/*<ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTemperatureAnomaly" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temperatureAnomaly)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temperatureAnomaly)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCo2Levels" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-co2Levels)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-co2Levels)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 3}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="temperatureAnomaly"
              type="natural"
              fill="url(#fillTemperatureAnomaly)"
              stroke="var(--color-temperatureAnomaly)"
              stackId="a"
              name="Temperature Anomaly (°C)"
            />
            <Area
              dataKey="co2Levels"
              type="natural"
              fill="url(#fillCo2Levels)"
              stroke="var(--color-co2Levels)"
              stackId="a"
              name="CO2 Levels (ppm)"
            />
          </AreaChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  );
}