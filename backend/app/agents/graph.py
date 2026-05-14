from langgraph.graph import StateGraph, END
from app.agents.state import AgentState

# --- Define Nodes (Agents) ---

def orchestrator_node(state: AgentState) -> AgentState:
    print("Agent: Orchestrator is routing the request...")
    task = state.get("current_task")
    if task == "process_material":
        state["next_agent"] = "material_processor"
    elif task == "evaluate_audio":
        state["next_agent"] = "user_audio"
    else:
        state["next_agent"] = END
    return state

def material_processor_node(state: AgentState) -> AgentState:
    print("Agent: Material Processor splitting audio via MiMo V2.5-ASR...")
    # Mocking MiMo ASR call
    state["chunked_data"] = [
        {"text": "Welcome to", "start": 0.0, "end": 1.1},
        {"text": "NeuroChunk Trainer", "start": 1.2, "end": 2.5}
    ]
    state["next_agent"] = END
    return state

def user_audio_node(state: AgentState) -> AgentState:
    print("Agent: User Audio preprocessing...")
    state["next_agent"] = "prosody_evaluator"
    return state

def prosody_evaluator_node(state: AgentState) -> AgentState:
    print("Agent: Prosody Evaluator analyzing via MiMo V2.5-Omni...")
    # Mocking MiMo Omni Evaluation
    state["evaluation_metrics"] = {"rhythm_score": 0.88, "pitch_accuracy": 0.95}
    state["next_agent"] = "training_coach"
    return state

def training_coach_node(state: AgentState) -> AgentState:
    print("Agent: Training Coach generating actionable feedback...")
    metrics = state.get("evaluation_metrics", {})
    if metrics.get("rhythm_score", 0) < 0.9:
        state["coach_feedback"] = "Watch your rhythm on the second chunk, try to tap along!"
    else:
        state["coach_feedback"] = "Perfect rhythm synchronization!"
    state["next_agent"] = "personalizer"
    return state

def personalizer_node(state: AgentState) -> AgentState:
    print("Agent: Personalizer updating learning curve...")
    # Update DB or stats here
    state["next_agent"] = END
    return state

# --- Build LangGraph ---

workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("orchestrator", orchestrator_node)
workflow.add_node("material_processor", material_processor_node)
workflow.add_node("user_audio", user_audio_node)
workflow.add_node("prosody_evaluator", prosody_evaluator_node)
workflow.add_node("training_coach", training_coach_node)
workflow.add_node("personalizer", personalizer_node)

# Define Entry Point
workflow.set_entry_point("orchestrator")

# Define Conditional Edges from Orchestrator
workflow.add_conditional_edges(
    "orchestrator",
    lambda state: state["next_agent"],
    {
        "material_processor": "material_processor",
        "user_audio": "user_audio",
        END: END
    }
)

# Define standard flow
workflow.add_edge("material_processor", END)
workflow.add_edge("user_audio", "prosody_evaluator")
workflow.add_edge("prosody_evaluator", "training_coach")
workflow.add_edge("training_coach", "personalizer")
workflow.add_edge("personalizer", END)

# Compile
app_graph = workflow.compile()
