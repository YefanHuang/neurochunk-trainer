from typing import TypedDict, Optional, List, Dict, Any

class AgentState(TypedDict):
    """
    State dictionary for the LangGraph execution.
    """
    user_id: str
    session_id: str
    current_task: str  # e.g., "process_material", "evaluate_audio"
    
    # Audio & Processing
    raw_audio_path: Optional[str]
    chunked_data: Optional[List[Dict[str, Any]]]  # Results from MiMo ASR
    
    # User Input
    user_audio_data: Optional[str]
    reference_text: Optional[str]
    
    # Evaluation Results
    evaluation_metrics: Optional[Dict[str, Any]]  # Results from MiMo Omni
    coach_feedback: Optional[str]
    
    # Routing
    next_agent: Optional[str]
    error: Optional[str]
