from alembic import op
import sqlalchemy as sa

def upgrade():
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String, unique=True, nullable=False),
    )

    # Create games table
    op.create_table(
        'games',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String, unique=True, nullable=False),
    )

    # Create recordings table
    op.create_table(
        'recordings',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('game_id', sa.Integer, sa.ForeignKey('games.id'), nullable=False),
        sa.Column('score', sa.Integer),
        sa.Column('timestamp', sa.String),
    )

def downgrade():
    op.drop_table('recordings')
    op.drop_table('games')
    op.drop_table('users')
