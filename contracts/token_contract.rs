// TokenContract.rs
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Token {
    pub name: String,
    pub symbol: String,
    pub total_supply: u64,
    pub decimals: u8,
    pub metadata_uri: String,
    // 新增字段表示是否禁用铸币权限
    pub disable_mint_authority: bool,
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account_iter = &mut accounts.iter();
    let mint_account = next_account_info(account_iter)?;
    let rent = &Rent::from_account_info(next_account_info(account_iter)?)?;

    if !mint_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if !rent.is_exempt(mint_account.lamports(), mint_account.data_len()) {
        return Err(ProgramError::AccountNotRentExempt);
    }

    // 反序列化指令数据到 Token 结构体
    let token_data = Token::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    // 根据 disable_mint_authority 字段来设置铸币权限
    let mint_authority = if token_data.disable_mint_authority {
        None // 禁用铸币权限
    } else {
        Some(mint_account.key) // 设置铸币权限为特定账户
    };

    // Token 创建逻辑
    // 这里应该包含使用 mint_authority 来初始化代币的逻辑
    // ...

    Ok(())
}