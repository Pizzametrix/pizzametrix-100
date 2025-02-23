
import { DoughParameters } from "./napolitain/components/DoughParameters";
import { PrefermentSection } from "./napolitain/components/PrefermentSection";
import { RestPhases } from "./napolitain/components/RestPhases";
import { IngredientsTable } from "./napolitain/components/IngredientsTable";
import { SettingsPanel } from "./napolitain/components/SettingsPanel";
import { SaveRecipeDialog } from "./napolitain/components/SaveRecipeDialog";
import { TegliaLayout } from "./teglia/components/TegliaLayout";
import { ActionButtons } from "./napolitain/components/ActionButtons";
import { useTegliaDough } from "./teglia/hooks/useTegliaDough";

export default function TegliaCalculator() {
  const {
    totalWeight,
    pizzaCount,
    setPizzaCount,
    ballWeight,
    setBallWeight,
    hydration,
    setHydration,
    salt,
    setSalt,
    oil,
    setOil,
    sugar,
    setSugar,
    isOilEnabled,
    setIsOilEnabled,
    isSugarEnabled,
    setIsSugarEnabled,
    isSettingsOpen,
    setIsSettingsOpen,
    phases,
    yeastType,
    setYeastType,
    doughType,
    setDoughType,
    prefermentFlour,
    setPrefermentFlour,
    prefermentHydration,
    setPrefermentHydration,
    prefermentYeast,
    setPrefermentYeast,
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    isCustomYeastEnabled,
    setIsCustomYeastEnabled,
    customYeast,
    setCustomYeast,
    handleIncrement,
    handleDecrement,
    handlePhaseChange,
    addPhase,
    removePhase,
    calculateIngredients,
    handleSaveRecipe,
  } = useTegliaDough();

  const { ingredients, ingredientsTotal } = calculateIngredients();

  const totalDuration = phases.reduce((total, phase) => total + phase.duration, 0);

  return (
    <TegliaLayout
      actionButtons={
        <ActionButtons
          onSaveClick={() => setIsSaveDialogOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
      }
    >
      <DoughParameters
        totalWeight={totalWeight}
        pizzaCount={pizzaCount}
        setPizzaCount={setPizzaCount}
        ballWeight={ballWeight}
        setBallWeight={setBallWeight}
        hydration={hydration}
        setHydration={setHydration}
        salt={salt}
        setSalt={setSalt}
        oil={oil}
        setOil={setOil}
        sugar={sugar}
        setSugar={setSugar}
        isOilEnabled={isOilEnabled}
        isSugarEnabled={isSugarEnabled}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />

      <PrefermentSection
        doughType={doughType}
        prefermentFlour={prefermentFlour}
        setPrefermentFlour={setPrefermentFlour}
        prefermentHydration={prefermentHydration}
        setPrefermentHydration={setPrefermentHydration}
        prefermentYeast={prefermentYeast}
        setPrefermentYeast={setPrefermentYeast}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />

      <RestPhases
        phases={phases}
        totalDuration={totalDuration}
        handlePhaseChange={handlePhaseChange}
        addPhase={addPhase}
        removePhase={removePhase}
      />

      <IngredientsTable
        doughType={doughType}
        ingredients={ingredients}
        ingredientsTotal={ingredientsTotal}
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        yeastType={yeastType}
        setYeastType={setYeastType}
        doughType={doughType}
        setDoughType={setDoughType}
        isOilEnabled={isOilEnabled}
        setIsOilEnabled={setIsOilEnabled}
        isSugarEnabled={isSugarEnabled}
        setIsSugarEnabled={setIsSugarEnabled}
        isCustomYeastEnabled={isCustomYeastEnabled}
        setIsCustomYeastEnabled={setIsCustomYeastEnabled}
        customYeast={customYeast}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        setCustomYeast={setCustomYeast}
      />

      <SaveRecipeDialog
        open={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        onSave={handleSaveRecipe}
      />
    </TegliaLayout>
  );
}
