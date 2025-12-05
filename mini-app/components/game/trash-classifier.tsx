"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TrashItem = {
  id: number;
  type: "compost" | "waste" | "recyclable";
  name: string;
};

const trashTypes: TrashItem[] = [
  { id: 1, type: "compost", name: "Food Waste" },
  { id: 2, type: "waste", name: "General Waste" },
  { id: 3, type: "recyclable", name: "Recyclable Items" },
];

const bins = [
  { type: "compost", label: "Compost Bin" },
  { type: "waste", label: "Waste Bin" },
  { type: "recyclable", label: "Recyclable Bin" },
];

export default function TrashClassifier() {
  const [current, setCurrent] = useState<TrashItem | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!current) {
      setCurrent(trashTypes[Math.floor(Math.random() * trashTypes.length)]);
    }
  }, [current]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleBinClick = (binType: string) => {
    if (!current || gameOver) return;
    if (binType === current.type) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setCurrent(null);
  };

  if (gameOver) {
    return (
      <Card className="w-full max-w-md mx-auto mt-4 border-2 border-primary">
        <CardHeader>
          <h2 className="text-xl font-semibold">Game Over</h2>
        </CardHeader>
        <CardContent>
          <p className="text-center text-2xl">Score: {score}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.reload()}>Play Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <h2 className="text-xl font-semibold">Eco Trash Sorter</h2>
        <p className="text-muted-foreground">Time left: {timeLeft}s</p>
        <p className="text-muted-foreground">Score: {score}</p>
      </CardHeader>
      <CardContent>
        {current && (
          <div className="text-center mb-4">
            <p className="text-lg font-medium">{current.name}</p>
            <p className="text-sm text-muted-foreground">Select the correct ecological bin</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {bins.map((bin) => (
            <Button
              key={bin.type}
              variant="outline"
              onClick={() => handleBinClick(bin.type)}
              className={cn("w-full")}
            >
              {bin.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
